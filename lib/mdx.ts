import fs from 'fs';
import path from 'path';
import { promises as dns } from 'dns';
import matter from 'gray-matter';
import { PostData } from '@/types/post';

/**
 * 抓取特定資料夾下的 .mdx 檔案，取出 FrontMatter（文章 metadata）和正文內容
 * @param dir 資料夾路徑
 * @returns 純檔案名稱陣列
 */
function getMDXFiles(dir: string) {
  // fs.readdirSync 讀取資料夾內所有檔案
  // path.extname(file) === ".mdx" 篩選出 .mdx 副檔名
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}
/**
 * 讀取單一 MDX 檔案，並解析 FrontMatter 和 content
 * @param filePath 檔案路徑
 * @returns [{ metadata, slug, content }] metadata: FrontMatter, slug: 不含副檔名的純檔名, content: 文章內容
 */
function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  // 用 fs.readFileSync 讀取單一檔案字串 => 把檔案內容用 UTF-8 編碼解析成純文字字串
  // gray-matter 解析 FrontMatter（YAML 格式的 metadata）
  // 回傳 { data: metadata, content }
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return matter(rawContent);
}

/**
 * 取得特定資料夾下所有 MDX 檔案的 metadata 和 content
 * @param dir 資料夾路徑
 * @returns [{ metadata, slug, content }] metadata: FrontMatter, slug: 不含副檔名的純檔名, content: 文章內容
 */
function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map(file => {
    const { data: metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file)); // 取得不含副檔名的純檔名當作 slug(文章路由)

    return {
      metadata,
      slug,
      content,
    };
  });
}

/**
 * path.join(process.cwd() 回傳專案根目錄(程式啟動時所在的資料夾路徑)
 * */

/**
 * 文章列表
 * @returns 取得所有部落格文章的 metadata 和 content
 */
export function getBlogPosts() {
  // path.join(process.cwd(), "contents")
  // 組合成絕對路徑：專案根目錄/contents
  return getMDXData(path.join(process.cwd(), 'contents')) as PostData[];
}

/**
 * TermsOfServices列表
 * @returns 取得所有TermsOfServices列表的 metadata 和 content
 */
// export function getTermsOfServices() {
//   return getMDXData(
//     path.join(process.cwd(), 'src', 'app', 'terms-of-services')
//   );
// }

/**
 * 取得隱私權政策內容
 * @returns
 */
// export function getPrivacyPolicy() {
//   return getMDXData(path.join(process.cwd(), 'src', 'app', 'privacy-policy'));
// }

/**
 * 檢查 Email 的網域是否可用（避免假信箱）
 * 驗證 Email 是否有效（檢查是否為黑名單域名，並查詢 MX 紀錄）
 * @param emailAddress 要驗證的 Email 地址
 * @returns
 */
export async function validateEmailAddress(emailAddress: string) {
  const invalidDomains = [
    'tempmail.com',
    'example.com',
    'email.com',
    'eamil.com',
    'test.com',
  ];
  const [, domain] = emailAddress.split('@');

  // Example custom logic: Ensure domain exists and isn't blacklisted
  if (invalidDomains.includes(domain)) {
    return false; // Invalid if domain is blacklisted
  }

  try {
    const mxRecords = await dns.resolveMx(domain);

    if (!mxRecords || mxRecords.length === 0) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error) {
      console.error((error as { code?: string }).code);
    }
  }
}
