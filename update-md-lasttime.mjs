import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @file 更新 md 文件的 updatedDate 元数据的脚本
 * 需要手动允许，也可以通过 配置 vscode 扩展 save-hooks 调用
 * */ 

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录
const __dirname = path.dirname(__filename);

// 更新 MD 文件的元数据
function updateMetadata(filePath) {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // 查找 pubDate 行
    let updatedDateIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('updatedDate:')) {
            updatedDateIndex = i;
            break;
        }
    }

    // 更新 pubDate 行
    if (updatedDateIndex !== -1) {
      lines[updatedDateIndex] = `updatedDate: ${formattedDate} 12:00:00`;
    } else {
      // 如果 pubDate 不存在，插入新行
        const frontMatterEndIndex = lines.findIndex(line => line == '---\r');
        // console.log(frontMatterEndIndex);
        
        if (frontMatterEndIndex !== -1) {
            lines.splice(frontMatterEndIndex+1, 0, `updatedDate: ${formattedDate} 12:00:00`);
        }
    }

  // 写入更新后的内容
  const updatedContent = lines.join('\n');
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

// 遍历指定目录下的所有 MD 文件
function updateAllMdFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            updateAllMdFiles(filePath);
        } else if (path.extname(file) === '.md') {
            updateMetadata(filePath);      
        }
    }
}

// 更新 src/content/posts 目录下的所有 MD 文件
const postsDir = path.join(__dirname, 'src', 'content', 'posts');
updateAllMdFiles(postsDir);
