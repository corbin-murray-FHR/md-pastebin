import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import { compressionService } from '@/lib/compression';
import { storageService } from '@/lib/storage';
import { toast } from 'sonner';
import { Share2, AlertTriangle } from 'lucide-react';

const MAX_SAFE_LENGTH = 7000;

export function Editor() {
  const location = useLocation();
  const [markdown, setMarkdown] = useState('');
  const [isWarningLength, setIsWarningLength] = useState(false);

  useEffect(() => {
    const remixContent = location.state?.content;
    if (remixContent) {
      const existingDraft = storageService.getDraft();
      if (existingDraft && existingDraft !== remixContent) {
        const shouldOverwrite = window.confirm(
          'You have an existing draft. Do you want to replace it with the remixed content?'
        );
        if (shouldOverwrite) {
          setMarkdown(remixContent);
          storageService.saveDraft(remixContent);
        } else {
          setMarkdown(existingDraft);
        }
      } else {
        setMarkdown(remixContent);
        storageService.saveDraft(remixContent);
      }
    } else {
      const savedDraft = storageService.getDraft();
      if (savedDraft) {
        setMarkdown(savedDraft);
      }
    }
  }, [location.state]);

  useEffect(() => {
    setIsWarningLength(markdown.length > MAX_SAFE_LENGTH);
  }, [markdown]);

  const handleMarkdownChange = useCallback((value: string) => {
    setMarkdown(value);
    storageService.saveDraft(value);
  }, []);

  const handleShare = useCallback(() => {
    if (!markdown.trim()) {
      toast.error('Cannot share empty content');
      return;
    }

    try {
      const compressed = compressionService.compress(markdown);
      const shareUrl = `${window.location.origin}${window.location.pathname}#/view/${encodeURIComponent(compressed)}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success('Link copied to clipboard!');
      }).catch(() => {
        toast.error('Failed to copy link');
      });
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to generate share link');
    }
  }, [markdown]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Create & Share</h2>
        <Button onClick={handleShare} disabled={!markdown.trim()}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {isWarningLength && (
        <div className="flex items-center gap-2 p-3 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400 rounded-md border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p>
            Content is {markdown.length} characters. URLs may become unreliable above {MAX_SAFE_LENGTH} characters.
          </p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Markdown</h3>
          <Textarea
            value={markdown}
            onChange={(e) => handleMarkdownChange(e.target.value)}
            placeholder="Type your markdown here..."
            className="min-h-[500px] font-mono text-sm resize-y"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Preview</h3>
          <div className="min-h-[500px] border rounded-md p-4 bg-background overflow-auto">
            {markdown ? (
              <MarkdownPreview content={markdown} />
            ) : (
              <p className="text-muted-foreground text-sm">Preview will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

