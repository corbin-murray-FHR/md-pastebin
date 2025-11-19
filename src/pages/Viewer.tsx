import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import { ErrorState } from '@/components/ErrorState';
import { compressionService } from '@/lib/compression';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

export function Viewer() {
  const { content: encodedContent } = useParams<{ content: string }>();
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!encodedContent) {
      setError('No content provided in URL');
      return;
    }

    try {
      const decodedContent = decodeURIComponent(encodedContent);
      const decompressed = compressionService.decompress(decodedContent);
      
      if (!decompressed) {
        setError('Failed to decompress content. The link may be corrupted.');
        return;
      }

      setMarkdown(decompressed);
    } catch (err) {
      console.error('Decompression error:', err);
      setError('Failed to load content. The link may be invalid or corrupted.');
    }
  }, [encodedContent]);

  const handleCopyRaw = () => {
    if (!markdown) return;

    navigator.clipboard.writeText(markdown).then(() => {
      toast.success('Raw markdown copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy markdown');
    });
  };

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">View Shared Content</h2>
        <ErrorState message={error} title="Unable to Load Content" />
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">View Shared Content</h2>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shared Content</h2>
        <Button onClick={handleCopyRaw} variant="outline">
          <Copy className="mr-2 h-4 w-4" />
          Copy Raw Markdown
        </Button>
      </div>

      <div className="border rounded-md p-6 bg-background">
        <MarkdownPreview content={markdown} />
      </div>
    </div>
  );
}
