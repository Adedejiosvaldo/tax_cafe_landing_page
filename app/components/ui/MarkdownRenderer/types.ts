import {
  type HTMLAttributes,
  type DetailedHTMLProps,
  type OlHTMLAttributes,
  type DelHTMLAttributes,
  type BlockquoteHTMLAttributes,
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes
} from 'react'

export interface MarkdownRendererProps {
  children?: string
  classname?: string
  inline?: boolean
}

type DefaultHTMLElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>

export type UnorderedListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>
export type OrderedListProps = DetailedHTMLProps<
  OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>

export type EmphasizedTextProps = DefaultHTMLElement
export type ItalicTextProps = DefaultHTMLElement
export type StrongTextProps = DefaultHTMLElement
export type BoldTextProps = DefaultHTMLElement
export type UnderlinedTextProps = DefaultHTMLElement
export type DeletedTextProps = DetailedHTMLProps<
  DelHTMLAttributes<HTMLModElement>,
  HTMLModElement
>
export type HorizontalRuleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHRElement>,
  HTMLHRElement
>
export type PreparedTextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>
export type BlockquoteProps = DetailedHTMLProps<
  BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>
export type AnchorLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>
export type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>
export type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>
export type ParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>
export type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>
export type TableBodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>
export type TableHeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>
export type TableHeaderCellProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableHeaderCellElement>,
  HTMLTableHeaderCellElement
>
export type TableRowProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>
export type TableCellProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>
