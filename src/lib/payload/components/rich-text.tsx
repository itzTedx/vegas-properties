import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from "@payloadcms/richtext-lexical/react";

import { cn } from "@/lib/utils";

type NodeTypes = DefaultNodeTypes;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "prose dark:prose-invert md:prose-md mx-auto": enableProse,
        },
        className
      )}
      converters={jsxConverters}
      {...rest}
    />
  );
}
