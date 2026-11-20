const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('my-app/src');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let orig = content;

  // Colors mapping
  content = content.replaceAll('#c9a24b', '#F43F43');
  content = content.replaceAll('#dfbe73', '#F84146');
  content = content.replaceAll('#b8913b', '#EC3A40');
  content = content.replaceAll('#b38a36', '#EC3A40');
  content = content.replaceAll('#e8cf8a', '#FDEEEA');
  
  content = content.replaceAll('#ff385c', '#F43F43');
  content = content.replaceAll('#f03a47', '#F43F43');
  content = content.replaceAll('#e0284f', '#EC3A40');

  content = content.replaceAll('#3a1220', '#101417');
  content = content.replaceAll('#2a0f18', '#101417');
  content = content.replaceAll('#2a111a', '#101417');
  content = content.replaceAll('#1a0a10', '#101417');
  content = content.replaceAll('#0e070c', '#101417');
  content = content.replaceAll('#200911', '#101417');
  content = content.replaceAll('#3a121e', '#101417');

  content = content.replaceAll('#f7f5f2', '#F5F5F7');
  content = content.replaceAll('#0b0b0c', '#101417');
  content = content.replaceAll('#ebe7e1', '#E8E8EC');
  content = content.replaceAll('#6b6670', '#6B7075');

  // Also replace some common amber/gold badge styling
  content = content.replaceAll('bg-amber-50 text-[#F43F43]', 'bg-[var(--accent-tint)] text-[var(--accent)]');
  content = content.replaceAll('bg-amber-50 text-amber-800', 'bg-[var(--accent-tint)] text-[var(--accent)]');
  content = content.replaceAll('bg-amber-50', 'bg-[var(--accent-tint)]');
  content = content.replaceAll('border-amber-200/80', 'border-[var(--accent)]/20');
  content = content.replaceAll('text-amber-800', 'text-[var(--accent)]');
  content = content.replaceAll('text-amber-700', 'text-[var(--accent)]');
  content = content.replaceAll('text-amber-600', 'text-[var(--accent)]');
  content = content.replaceAll('hover:text-[#F43F43]', 'hover:text-[var(--accent)]');
  content = content.replaceAll('focus-within:border-[#F43F43]', 'focus-within:border-[var(--accent)]');

  if (content !== orig) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Restyled:', f);
  }
});
