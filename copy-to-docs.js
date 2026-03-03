import { copyFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, 'dist')
const docsDir = path.join(__dirname, 'docs')

console.log('Copying dist to docs...')

try {
  // 如果 docs 目录存在，先删除
  if (existsSync(docsDir)) {
    rmSync(docsDir, { recursive: true, force: true })
    console.log('Removed existing docs directory')
  }

  // 复制 dist 到 docs
  copyFolderRecursive(distDir, docsDir)
  
  console.log('✓ Successfully copied dist to docs')
} catch (error) {
  console.error('Error copying files:', error)
  process.exit(1)
}

function copyFolderRecursive(src, dest) {
  // 创建目标目录
  mkdirSync(dest, { recursive: true })
  
  // 读取源目录中的所有文件和子目录
  const entries = readdirWithTypes(src)
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory) {
      // 递归复制子目录
      copyFolderRecursive(srcPath, destPath)
    } else {
      // 复制文件
      copyFileSync(srcPath, destPath)
    }
  }
}

function readdirWithTypes(dir) {
  const entries = []
  const items = Array.from(
    readdirSync(dir, { withFileTypes: true })
  )
  
  for (const item of items) {
    entries.push({
      name: item.name,
      isDirectory: item.isDirectory()
    })
  }
  
  return entries
}
