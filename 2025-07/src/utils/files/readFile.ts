import { readFile } from 'fs/promises';
import { resolve } from 'path';

/**
 * 将别名路径转换为绝对路径
 * @param aliasPath - 包含别名的路径（如 "@/prompts/file.md"）
 * @returns 转换后的绝对路径
 */
function resolveAliasPath(aliasPath: string): string {
    // 定义别名映射（根据你的项目结构调整）
    const ALIAS_MAPPING = {
        '@/': resolve(__dirname, '../../'), // 项目根目录
        '@prompts/': resolve(__dirname, '../../constants/prompt'), // 确保末尾有斜杠
    };

    // 遍历所有别名，替换匹配的部分
    for (const [alias, realPath] of Object.entries(ALIAS_MAPPING)) {
        if (aliasPath.startsWith(alias)) {
            // 使用 path.join 确保路径分隔符合操作系统规范
            const relativePath = aliasPath.substring(alias.length);
            // console.log('解析路径:', aliasPath, '→', relativePath);
            return resolve(realPath, relativePath);
        }
    }


    return aliasPath;
}

/**
 * 异步读取 Markdown 文件并返回内容
 * @param filePath - Markdown 文件路径（支持别名）
 * @returns 包含文件内容的 Promise
 */
export async function readMarkdownAsync(filePath: string): Promise<string> {
    try {
        // 先解析别名路径为绝对路径
        const absolutePath = resolveAliasPath(filePath);
        return await readFile(absolutePath, 'utf-8');
    } catch (error) {
        console.error(`读取文件失败: ${error}`);
        throw error;
    }
}