import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; centerX: number; centerY: number; radius: number }
  | { type: "text"; x: number; y: number; content: string }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  gettool: () => string
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let existingShapes: Shape[] = await getExistingShapes(roomId);
  let clicked = false;
  let startX = 0;
  let startY = 0;
  let selectedShapeIndex: number | null = null;
  let offsetX = 0;
  let offsetY = 0;

  clearCanvas(existingShapes, canvas, ctx);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
    } else if (message.type === "erase") {
      const { index } = JSON.parse(message.message);
      existingShapes.splice(index, 1);
    }
    clearCanvas(existingShapes, canvas, ctx);
  };

  canvas.addEventListener("mousedown", (e) => {
    const tool = gettool();
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    clicked = true;

    if (tool === "move") {
      const hit = getShapeAt(startX, startY, existingShapes);
      if (hit) {
        selectedShapeIndex = hit.index;
        const shape = hit.shape;
        if (shape.type === "rect") {
          offsetX = startX - shape.x;
          offsetY = startY - shape.y;
        } else if (shape.type === "circle") {
          offsetX = startX - shape.centerX;
          offsetY = startY - shape.centerY;
        } else if (shape.type === "text") {
          offsetX = startX - shape.x;
          offsetY = startY - shape.y;
        } else if (shape.type === "line") {
          offsetX = startX - shape.x1;
          offsetY = startY - shape.y1;
        }
      }
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    const tool = gettool();
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    let shape: Shape | null = null;

    if (tool === "text") {
      const content = prompt("Enter text:");
      if (!content) return;
      shape = { type: "text", x: startX, y: startY, content };
    } else if (tool === "eraser") {
      const hit = getShapeAt(endX, endY, existingShapes);
      if (hit) {
        existingShapes.splice(hit.index, 1);
        socket.send(
          JSON.stringify({
            type: "erase",
            message: JSON.stringify({ index: hit.index }),
            roomId,
          })
        );
      }
    } else if (tool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width: endX - startX,
        height: endY - startY,
      };
    } else if (tool === "circle") {
      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);
      const radius = Math.min(width, height) / 2;
      const centerX = (startX + endX) / 2;
      const centerY = (startY + endY) / 2;
      shape = {
        type: "circle",
        centerX,
        centerY,
        radius,
      };
    } else if (tool === "line") {
      shape = {
        type: "line",
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
      };
    }

    if (shape) {
      existingShapes.push(shape);
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId,
        })
      );
    }

    clicked = false;
    selectedShapeIndex = null;
    clearCanvas(existingShapes, canvas, ctx);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;

    const tool = gettool();
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    if (tool === "move" && selectedShapeIndex !== null) {
      const shape = existingShapes[selectedShapeIndex];
      if (shape.type === "rect") {
        shape.x = currentX - offsetX;
        shape.y = currentY - offsetY;
      } else if (shape.type === "circle") {
        shape.centerX = currentX - offsetX;
        shape.centerY = currentY - offsetY;
      } else if (shape.type === "text") {
        shape.x = currentX - offsetX;
        shape.y = currentY - offsetY;
      } else if (shape.type === "line") {
        const dx = currentX - offsetX - shape.x1;
        const dy = currentY - offsetY - shape.y1;
        shape.x1 += dx;
        shape.y1 += dy;
        shape.x2 += dx;
        shape.y2 += dy;
      }
      clearCanvas(existingShapes, canvas, ctx);
    } else if (["rect", "circle", "line"].includes(tool)) {
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "white";

      if (tool === "rect") {
        ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
      } else if (tool === "circle") {
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const radius = Math.min(width, height) / 2;
        const centerX = (startX + currentX) / 2;
        const centerY = (startY + currentY) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      }
    }
  });
}

function clearCanvas(shapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";

  for (const shape of shapes) {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "text") {
      ctx.font = "20px Arial";
      ctx.fillText(shape.content, shape.x, shape.y);
    } else if (shape.type === "line") {
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.stroke();
    }
  }
}

function getShapeAt(x: number, y: number, shapes: Shape[]): { shape: Shape; index: number } | null {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.type === "rect") {
      if (x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height) {
        return { shape, index: i };
      }
    } else if (shape.type === "circle") {
      const dx = x - shape.centerX;
      const dy = y - shape.centerY;
      if (Math.sqrt(dx * dx + dy * dy) <= shape.radius) {
        return { shape, index: i };
      }
    } else if (shape.type === "text") {
      const width = shape.content.length * 10;
      if (x >= shape.x && x <= shape.x + width && y >= shape.y - 20 && y <= shape.y) {
        return { shape, index: i };
      }
    } else if (shape.type === "line") {
      if (pointToLineDistance(x, y, shape.x1, shape.y1, shape.x2, shape.y2) < 5) {
        return { shape, index: i };
      }
    }
  }
  return null;
}

function pointToLineDistance(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  const param = lenSq !== 0 ? dot / lenSq : -1;

  let xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/api/v1/user/chats/${roomId}`);
  //@ts-ignore
  const messages = res.data.messages;
  return messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });
}
