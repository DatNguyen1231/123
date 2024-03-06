const path = require('path');
const fs = require('fs');

function copyFileAndReturnPath(imagePath) {
  const fileName = path.basename(imagePath);
  const newFilePath = `assets/images/${fileName}`;

  // Sao chép tệp hình ảnh vào thư mục mới
  fs.copyFileSync(imagePath, newFilePath);

  // Trả về đường dẫn đến tệp mới
  return newFilePath;
}