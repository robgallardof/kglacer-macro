// 坐标接口定义
interface TileCoordinate {
  tileX: number;
  tileY: number;
  pixelX: number;
  pixelY: number;
}

// 截取并保存图片
export async function saveScreenshot() {
  try {
    // 获取坐标值
    const tlX1 = (document.getElementById('group1-tlx') as HTMLInputElement).value;
    const tlY1 = (document.getElementById('group1-tly') as HTMLInputElement).value;
    const pxX1 = (document.getElementById('group1-pxx') as HTMLInputElement).value;
    const pxY1 = (document.getElementById('group1-pxy') as HTMLInputElement).value;
    
    const tlX2 = (document.getElementById('group2-tlx') as HTMLInputElement).value;
    const tlY2 = (document.getElementById('group2-tly') as HTMLInputElement).value;
    const pxX2 = (document.getElementById('group2-pxx') as HTMLInputElement).value;
    const pxY2 = (document.getElementById('group2-pxy') as HTMLInputElement).value;
    
    // 验证输入
    if (!tlX1 || !tlY1 || !pxX1 || !pxY1 || !tlX2 || !tlY2 || !pxX2 || !pxY2) {
      alert('Please fill in all coordinate values.');
      return;
    }

    // 构建坐标对象
    const topLeft: TileCoordinate = {
      tileX: parseInt(tlX1),
      tileY: parseInt(tlY1),
      pixelX: parseInt(pxX1),
      pixelY: parseInt(pxY1)
    };

    const bottomRight: TileCoordinate = {
      tileX: parseInt(tlX2),
      tileY: parseInt(tlY2),
      pixelX: parseInt(pxX2),
      pixelY: parseInt(pxY2)
    };

    // 验证坐标顺序
    if (!isValidCoordinateOrder(topLeft, bottomRight)) {
      alert('右下角坐标必须大于左上角坐标！');
      return;
    }
    
    // 显示加载状态
    const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Downloading...';
    saveBtn.disabled = true;
    
    // 截取跨tile的图片
    const croppedImageBlob = await cropMultiTileImage(topLeft, bottomRight);
    
    // 下载截取的图片
    const filename = `wplace_crop_${topLeft.tileX}-${topLeft.tileY}_to_${bottomRight.tileX}-${bottomRight.tileY}_${Date.now()}.png`;
    downloadBlob(croppedImageBlob, filename);
        
    // 恢复按钮状态
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
    
  } catch (error) {
    console.error('保存图片时出错:', error);
    alert('保存图片失败：' + (error instanceof Error ? error.message : '未知错误'));
    
    // 恢复按钮状态
    const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
    saveBtn.textContent = 'Save';
    saveBtn.disabled = false;
  }
}

// 验证坐标顺序是否正确
function isValidCoordinateOrder(topLeft: TileCoordinate, bottomRight: TileCoordinate): boolean {
  // 检查tile坐标
  if (bottomRight.tileX < topLeft.tileX || bottomRight.tileY < topLeft.tileY) {
    return false;
  }
  
  // 如果在同一个tile内，检查像素坐标
  if (topLeft.tileX === bottomRight.tileX && topLeft.tileY === bottomRight.tileY) {
    return bottomRight.pixelX >= topLeft.pixelX && bottomRight.pixelY >= topLeft.pixelY;
  }
  
  return true;
}

// 截取跨多个tile的图片
async function cropMultiTileImage(topLeft: TileCoordinate, bottomRight: TileCoordinate): Promise<Blob> {
  const TILE_SIZE = 1000;
  
  // 计算需要的tile范围
  const tileStartX = topLeft.tileX;    // 水平方向（向右）
  const tileStartY = topLeft.tileY;    // 垂直方向（向下）
  const tileEndX = bottomRight.tileX;  // 水平方向（向右）
  const tileEndY = bottomRight.tileY;  // 垂直方向（向下）
  
  // 计算截取区域的实际尺寸
  let cropWidth, cropHeight;
  
  if (tileStartX === tileEndX) {
    // 同一列tile内的水平截取
    cropWidth = bottomRight.pixelX - topLeft.pixelX + 1;
  } else {
    // 跨多个tile的水平截取
    cropWidth = (TILE_SIZE - topLeft.pixelX + 1) + 
               (tileEndX - tileStartX - 1) * TILE_SIZE + 
               bottomRight.pixelX;
  }
  
  if (tileStartY === tileEndY) {
    // 同一行tile内的垂直截取
    cropHeight = bottomRight.pixelY - topLeft.pixelY + 1;
  } else {
    // 跨多个tile的垂直截取
    cropHeight = (TILE_SIZE - topLeft.pixelY + 1) + 
                (tileEndY - tileStartY - 1) * TILE_SIZE + 
                bottomRight.pixelY;
  }
  
  // 创建一个足够大的canvas来容纳所有需要的tile
  const totalCanvasWidth = (tileEndX - tileStartX + 1) * TILE_SIZE;  // X轴是水平方向
  const totalCanvasHeight = (tileEndY - tileStartY + 1) * TILE_SIZE; // Y轴是垂直方向
  
  // 创建canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('无法获取Canvas上下文');
  }
  
  canvas.width = totalCanvasWidth;
  canvas.height = totalCanvasHeight;
  
  // 加载所有需要的tile
  const tilePromises: Promise<HTMLImageElement>[] = [];
  const tilePositions: Array<{img: Promise<HTMLImageElement>, x: number, y: number, tileX: number, tileY: number}> = [];
  
  // 遍历tile：tileX控制水平位置，tileY控制垂直位置
  for (let tileX = tileStartX; tileX <= tileEndX; tileX++) {
    for (let tileY = tileStartY; tileY <= tileEndY; tileY++) {
      const tileUrl = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;
      const tilePromise = loadTileImage(tileUrl);
      tilePromises.push(tilePromise);
      
      tilePositions.push({
        img: tilePromise,
        x: (tileX - tileStartX) * TILE_SIZE,  // tileX对应canvas的X轴（水平）
        y: (tileY - tileStartY) * TILE_SIZE,  // tileY对应canvas的Y轴（垂直）
        tileX,
        tileY
      });
    }
  }
  
  // 等待所有tile加载完成
  await Promise.all(tilePromises);
  
  // 绘制所有tile到canvas
  for (const tilePos of tilePositions) {
    try {
      const img = await tilePos.img;
      ctx.drawImage(img, tilePos.x, tilePos.y);
    } catch (error) {
      console.warn(`Failed to load tile ${tilePos.tileX},${tilePos.tileY}:`, error);
      // 绘制一个占位符（灰色方块）
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(tilePos.x, tilePos.y, TILE_SIZE, TILE_SIZE);
    }
  }
  
  // 截取指定区域
  // pixel坐标从1开始，转换为canvas的0开始坐标系
  // 计算在拼接后canvas中的绝对位置  
  const finalCropX = (topLeft.tileX - tileStartX) * TILE_SIZE + topLeft.pixelX;
  const finalCropY = (topLeft.tileY - tileStartY) * TILE_SIZE + topLeft.pixelY;
  
  // 创建最终的canvas
  const finalCanvas = document.createElement('canvas');
  const finalCtx = finalCanvas.getContext('2d');
  
  if (!finalCtx) {
    throw new Error('无法获取最终Canvas上下文');
  }
  
  finalCanvas.width = cropWidth;
  finalCanvas.height = cropHeight;
  
  // 绘制截取的区域
  finalCtx.drawImage(
    canvas,
    finalCropX, finalCropY, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight
  );
  
  // 转换为Blob
  return new Promise((resolve, reject) => {
    finalCanvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('无法生成图片Blob'));
      }
    }, 'image/png');
  });
}

// 加载单个tile图片
function loadTileImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load tile: ${url}`));
    
    img.src = url;
  });
}

// 下载并截取图片
export async function downloadAndCropImage(imageUrl: string, cropX: number, cropY: number, cropWidth: number, cropHeight: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // 创建图片元素
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 允许跨域
    
    img.onload = () => {
      try {
        // 创建canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('无法获取Canvas上下文'));
          return;
        }
        
        // 设置canvas尺寸为截取区域的大小
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        
        // 检查截取区域是否在图片范围内
        if (cropX + cropWidth > img.width || cropY + cropHeight > img.height) {
          reject(new Error(`截取区域超出图片范围。图片尺寸: ${img.width}x${img.height}, 截取区域: ${cropX},${cropY} -> ${cropX + cropWidth},${cropY + cropHeight}`));
          return;
        }
        
        // 绘制截取的部分到canvas
        ctx.drawImage(
          img,
          cropX, cropY, cropWidth, cropHeight, // 源图片的截取区域
          0, 0, cropWidth, cropHeight // canvas上的绘制区域
        );
        
        // 将canvas转换为Blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('无法生成图片Blob'));
          }
        }, 'image/png');
        
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('图片加载失败，请检查网络连接或URL是否正确'));
    };
    
    // 开始加载图片
    img.src = imageUrl;
  });
}

// 下载Blob为文件
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}