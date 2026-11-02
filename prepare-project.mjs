// Browser-upload edition: restore application folders from the checked-in source manifest.
// No network requests or credentials are used here.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const manifest=JSON.parse(await readFile(new URL('./project-source.json',import.meta.url),'utf8'));
if(manifest.version!==1||!Array.isArray(manifest.files))throw Error('Invalid project-source.json');
for(const file of manifest.files){
 if(typeof file.path!=='string'||! /^(app|components|lib|public)\//.test(file.path)||file.path.includes('\\')||file.path.split('/').some(p=>p==='..'||p===''))throw Error('Invalid source path');
 if(file.encoding!=='utf8'&&file.encoding!=='base64')throw Error('Invalid source encoding');
 const target=resolve(root,file.path);
 if(!target.startsWith(resolve(root)+sep))throw Error('Source path outside project');
 await mkdir(dirname(target),{recursive:true});
 await writeFile(target,file.encoding==='base64'?Buffer.from(file.content,'base64'):file.content);
}
console.log(`Prepared ${manifest.files.length} application files for Next.js.`);
