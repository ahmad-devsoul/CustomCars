import fs from 'fs';
import path from 'path';

export async function generateMetadata() {
  return {
    title: 'Rhye – AJAX Portfolio',
  };
}

export default function ProjectDetails() {
  const filePath = path.join(process.cwd(), 'public', 'project-details-7-fullscreen-left.html');
  const htmlContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
