import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm";

const MarkdownFunctionsTable = `
|NOTE: Search this Blog for detailed information (blogId=67d9bf8b5a1b90fe8ba75869)|
| Markdown Syntax    | Description                         | Example |
|--------------------|-------------------------------------|---------|
| \`# Heading 1\`     | Creates a large heading           | # Heading 1 |
| \`## Heading 2\`    | Creates a medium heading         | ## Heading 2 |
| \`**Bold**\`       | Makes text bold                  | **Bold Text** |
| \`*Italic*\`      | Makes text italic                | *Italic Text* |
| \`~~Strikethrough~~\` | Strikes through text         | ~~Strikethrough~~ |
| \`[Link](URL)\`    | Creates a hyperlink               | [Google](https://google.com) |
| \`![Alt Text](ImageURL)\` | Embeds an image         | ![Logo](https://via.placeholder.com/150) |
| \`- List Item\`    | Creates an unordered list item    | - Item 1 |
| \`1. Ordered Item\` | Creates an ordered list item   | 1. Item 1 |
| \`\`\`code block\`\`\` | Creates a code block        | \`\`\`console.log("Hello")\`\`\` |
| \`> Blockquote\`   | Creates a blockquote              | > This is a quote |
`;

export const MarkdownInfoComponent = () => {

    return <div>
        <div>
            <Dialog>
                <DialogTrigger>Help</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Following are major functionality in markdown files:</DialogTitle>
                        <DialogDescription>
                            <Markdown rehypePlugins={[remarkGfm]}>{MarkdownFunctionsTable}</Markdown>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    </div>
}
