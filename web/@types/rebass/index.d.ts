declare module 'rebass' {
  import * as React from 'react'

  // Styled System Types
  export type NumberOrString = number | string | null
  export type Responsive = NumberOrString | NumberOrString[]

  export interface Space {
    m?: Responsive
    mt?: Responsive
    mr?: Responsive
    mb?: Responsive
    ml?: Responsive
    mx?: Responsive
    my?: Responsive
    p?: Responsive
    pt?: Responsive
    pr?: Responsive
    pb?: Responsive
    pl?: Responsive
    px?: Responsive
    py?: Responsive
  }

  export interface Width {
    width?: Responsive
    w?: Responsive
  }

  export interface FontSize {
    fontSize?: Responsive
    f?: Responsive
  }

  export interface TextColor {
    color?: Responsive
  }

  export interface BackgroundColor {
    bg?: Responsive
  }

  export type Color = TextColor & BackgroundColor

  export interface FontFamily {
    fontFamily?: string
    font?: string
  }

  export interface TextAlign {
    textAlign?: Responsive
    align?: Responsive
  }

  export interface LineHeight {
    lineHeight?: NumberOrString
  }

  export interface FontWeight {
    fontWeight?: NumberOrString
  }

  export interface LetterSpacing {
    letterSpacing: NumberOrString
  }

  // Layout

  export interface Display {
    display?: Responsive
  }

  export interface MaxWidth {
    maxWidth?: Responsive
  }

  export interface MinWidth {
    minWidth?: Responsive
  }

  export interface Height {
    height?: Responsive
  }

  export interface MaxHeight {
    maxHeight?: Responsive
  }

  export interface MinHeight {
    minHeight?: Responsive
  }

  export interface SizeWidth {
    size?: Responsive
  }

  export interface SizeHeight {
    size?: Responsive
  }

  export type Size = SizeWidth & SizeHeight

  export interface Ratio {
    ratio?: NumberOrString
  }

  // Flexbox

  export interface AlignItems {
    alignItems?: Responsive
    align?: Responsive
  }

  export interface AlignContent {
    alignContent?: Responsive
  }

  export interface Justify {
    justify?: Responsive
  }

  export interface FlexWrap {
    flexWrap?: Responsive
    wrap?: Responsive
  }

  export interface FlexBasis {
    flexBasis?: Responsive
  }

  export interface FlexDirection {
    flexDirection?: Responsive
  }

  export interface Flex {
    flex?: Responsive
  }

  export interface JustifySelf {
    justifySelf?: Responsive
  }

  export interface AlignSelf {
    alignSelf?: Responsive
  }

  export interface Order {
    order?: Responsive
  }

  // Grid

  export interface GridGap {
    gridGap?: Responsive
  }

  export interface GridColumnGap {
    gridColumnGap?: Responsive
  }

  export interface GridRowGap {
    gridRowGap?: Responsive
  }

  export interface GridColumn {
    gridColumn?: Responsive
  }

  export interface GridRow {
    gridRow?: Responsive
  }

  export interface GridAutoFlow {
    gridAutoFlow?: NumberOrString
  }

  export interface GridAutoColumns {
    gridAutoColumns?: NumberOrString
  }

  export interface GridAutoRows {
    gridAutoRows?: NumberOrString
  }

  export interface GridTemplateColumns {
    gridTemplateColumns?: Responsive
  }

  export interface GridTemplateRows {
    gridTemplateRows?: Responsive
  }

  // Borders

  export interface Border {
    border?: Responsive
  }

  export interface BorderTop {
    borderTop?: Responsive
  }

  export interface BorderRight {
    borderRight?: Responsive
  }

  export interface BorderBottom {
    borderBottom?: Responsive
  }

  export interface BorderLeft {
    borderLeft?: Responsive
  }

  export type Borders = Border &
    BorderTop &
    BorderRight &
    BorderBottom &
    BorderLeft

  export interface BorderColor {
    borderColor?: NumberOrString
  }

  export interface BorderRadius {
    borderRadius?: NumberOrString
  }

  export interface BoxShadow {
    boxShadow?: NumberOrString
  }

  // Backgrounds

  export interface Background {
    background?: NumberOrString
  }

  export interface BackgroundImage {
    backgroundImage?: NumberOrString
    bgImage?: NumberOrString
  }

  export interface BackgroundSize {
    backgroundSize?: NumberOrString
    bgSize?: NumberOrString
  }

  export interface BackgroundPosition {
    backgroundPosition?: NumberOrString
    bgPosition?: NumberOrString
  }

  export interface BackgroundRepeat {
    backgroundRepeat?: NumberOrString
    bgRepeat?: NumberOrString
  }

  // Position

  export interface Position {
    position?: Responsive
  }

  export interface zIndex {
    zIndex?: NumberOrString
  }

  export interface Top {
    top?: Responsive
  }

  export interface Right {
    right?: Responsive
  }

  export interface Bottom {
    bottom?: Responsive
  }

  export interface Left {
    left?: Responsive
  }

  export interface Pseudo {
    hover?: Color & BorderColor & BoxShadow
  }

  export interface Focus {
    focus?: Color & BorderColor & BoxShadow
  }

  export interface Active {
    active?: Color & BorderColor & BoxShadow
  }

  export interface Disabled {
    disabled?: Color & BorderColor & BoxShadow
  }

  export interface TextStyle {
    textStyle?: string
  }

  export interface ColorStyle {
    colorStyle?: string
  }

  export interface ButtonStyle {
    buttonStyle?: string
  }

  export interface BorderWidth {
    borderWidth: NumberOrString
  }

  // TODaO
  interface FlexProps extends FlexWrap, FlexDirection, AlignItems, Justify {}
  type FlexClass = React.StatelessComponent<FlexProps>
  export const Flex: FlexClass

  interface BoxProps extends Width, Space, FontSize, Color, Flex, Order {}
  type BoxClass = React.StatelessComponent<BoxProps>
  export const Box: BoxClass

  interface Theme {
    breakpoints?: Responsive
    space?: Responsive
    font?: string
    monospace?: string
    fontSizes?: Responsive
    weights?: {
      normal?: NumberOrString
      bold?: NumberOrString
    }
    colors?: {
      [name: string]: string
    }
    radius?: number
  }

  interface Yolo {
    [x: string]: any
  }

  interface BaseProps extends Yolo, Space, Color, FontSize {}
  type BaseClass = React.StatelessComponent<BaseProps>
  export const Base: BaseClass

  interface CSSProps {
    css: string
  }
  type CSSClass = React.StatelessComponent<CSSProps>
  export const CSS: CSSClass

  interface RootProps extends Yolo, FontFamily, Space, Color {}
  type RootClass = React.StatelessComponent<RootProps>
  export const Root: RootClass

  interface ProviderProps extends Yolo {
    theme: Theme
  }
  type ProviderClass = React.StatelessComponent<ProviderProps>
  export const Provider: ProviderClass

  interface ButtonProps
    extends Yolo,
      FontSize,
      FontWeight,
      LineHeight,
      Space,
      Color,
      BorderRadius,
      Border {}
  type ButtonClass = React.StatelessComponent<ButtonProps>
  export const Button: ButtonClass
  export const ButtonCircle: ButtonClass
  export const ButtonOutline: ButtonClass
  export const ButtonTransparent: ButtonClass

  interface LinkProps extends Yolo, Color, Space {}
  type LinkClass = React.StatelessComponent<LinkProps>
  export const Link: LinkClass

  interface NavLinkProps
    extends Yolo,
      Color,
      FontSize,
      FontWeight,
      Space,
      Width {}
  type NavLinkClass = React.StatelessComponent<NavLinkProps>
  export const NavLink: NavLinkClass

  interface BlockLinkProps extends Yolo, ButtonProps, LineHeight {
    children?: React.ReactNode
  }
  type BlockLinkClass = React.StatelessComponent<BlockLinkProps>
  export const BlockLink: BlockLinkClass

  type CloseClass = React.StatelessComponent<BlockLinkProps>
  export const Close: CloseClass

  interface TextProps
    extends Yolo,
      Space,
      Color,
      FontSize,
      FontWeight,
      TextAlign,
      LineHeight {}
  type TextClass = React.StatelessComponent<TextProps>
  export const Text: TextClass
  export const Heading: TextClass
  export const Subhead: TextClass
  export const Small: TextClass
  export const Lead: TextClass
  export const Truncuate: TextClass

  type CapsClass = React.StatelessComponent<TextProps & LetterSpacing>
  export const Caps: CapsClass

  type BlockquoteClass = React.StatelessComponent<TextProps>
  export const Blockquote: BlockquoteClass

  interface DividerProps
    extends Yolo,
      Space,
      Border,
      BorderBottom,
      BorderColor,
      Color {}
  type DividerClass = React.StatelessComponent<DividerProps>
  export const Divider: DividerClass

  interface PreProps extends Yolo, FontSize, FontFamily, Space, Color {}
  type PreClass = React.StatelessComponent<PreProps>
  export const Pre: PreClass

  interface CodeProps extends Yolo, FontSize, FontFamily, Space, Color {}
  type CodeClass = React.StatelessComponent<PreProps>
  export const Code: CodeClass

  export const Samp: CodeClass

  interface MeasureProps extends TextProps, MaxWidth {}
  type MeasureClass = React.StatelessComponent<MeasureProps>
  export const Measure: MeasureClass

  interface LabelProps extends Yolo, FontSize, Space, AlignItems, Color {}
  type LabelClass = React.StatelessComponent<LabelProps>
  export const Label: LabelClass

  interface InputProps
    extends FontSize,
      LineHeight,
      Space,
      Width,
      Border,
      BorderColor,
      BoxShadow,
      BorderRadius,
      Color,
      BackgroundColor {}
  type InputClass = React.StatelessComponent<InputProps>
  export const Input: InputClass

  interface SelectProps
    extends Space,
      Width,
      Border,
      BorderColor,
      BoxShadow,
      BorderRadius,
      Color,
      BackgroundColor {}
  type SelectClass = React.StatelessComponent<SelectProps>
  export const Select: SelectClass

  interface TextareaProps
    extends Space,
      Width,
      FontSize,
      Color,
      Border,
      BorderColor,
      BoxShadow,
      BorderRadius {}
  type TextareaClass = React.StatelessComponent<TextareaProps>
  export const Textarea: TextareaClass

  interface RadioProps extends Space, Color {}
  type RadioClass = React.StatelessComponent<RadioProps>
  export const Radio: RadioClass

  interface CheckboxProps extends Space, Color {}
  type CheckboxClass = React.StatelessComponent<CheckboxProps>
  export const Checkbox: CheckboxClass

  interface SliderProps extends Width, Space, Color, BorderRadius {}
  type SliderClass = React.StatelessComponent<SliderProps>
  export const Slider: SliderClass

  interface SwitchProps extends Color, BorderRadius, Space {}
  type SwitchClass = React.StatelessComponent<SwitchProps>
  export const Switch: SwitchClass

  interface ImageProps extends Display, MaxWidth, Height, Space, Width, Color {}
  type ImageClass = React.StatelessComponent<ImageProps>
  export const Image: ImageClass

  interface BGImage {
    image?: string
    src?: string
  }
  interface BackgroundImageProps
    extends Width,
      Ratio,
      BackgroundSize,
      BackgroundPosition,
      Space,
      Color,
      BGImage {}
  type BackgroundImageClass = React.StatelessComponent<BackgroundImageProps>
  export const BackgroundImage: BackgroundImageClass

  interface AvatarProps extends Size, BorderRadius, Space, Color {}
  type AvatarClass = React.StatelessComponent<AvatarProps>
  export const Avatar: AvatarClass

  interface EmbedProps extends Ratio, Space, Color {}
  type EmbedClass = React.StatelessComponent<EmbedProps>
  export const Embed: EmbedClass

  interface ContainerProps extends BoxProps, Space, MaxWidth {}
  type ContainerClass = React.StatelessComponent<ContainerProps>
  export const Container: ContainerClass

  interface GroupProps extends FlexProps {}
  type GroupClass = React.StatelessComponent<GroupProps>
  export const Group: GroupClass

  interface RowProps extends Space {}
  type RowClass = React.StatelessComponent<RowProps>
  export const Row: RowClass

  interface ColumnProps extends Space, Flex {}
  type ColumnClass = React.StatelessComponent<ColumnProps>
  export const Column: ColumnClass

  interface BorderProps extends Border, BorderColor, Space, Width, Color {}
  type BorderClass = React.StatelessComponent<BorderProps>
  export const Border: BorderClass

  interface CardProps extends Space, Color, BorderRadius, BoxShadow {}
  type CardClass = React.StatelessComponent<CardProps>
  export const Card: CardClass

  interface PanelProps
    extends BackgroundColor,
      BorderRadius,
      Border,
      BorderColor,
      Space {}
  type PanelClass = React.StatelessComponent<PanelProps>
  export const Panel: PanelClass

  interface ProgressProps extends Width, Space, Color, BorderRadius {}
  type ProgressClass = React.StatelessComponent<ProgressProps>
  export const Progress: ProgressClass

  interface BannerProps
    extends FlexProps,
      Space,
      FlexDirection,
      AlignItems,
      Justify,
      BackgroundSize,
      BackgroundImage,
      BackgroundPosition,
      MinHeight,
      Color {}
  type BannerClass = React.StatelessComponent<BannerProps>
  export const Banner: BannerClass

  interface MessageProps
    extends FlexProps,
      Space,
      FontWeight,
      Color,
      AlignItems,
      MinHeight {}
  type MessageClass = React.StatelessComponent<MessageProps>

  export const Message: MessageClass

  interface ToolbarProps extends Space, Color, AlignItems, MinHeight {}
  type ToolbarClass = React.StatelessComponent<ToolbarProps>
  export const Toolbar: ToolbarClass

  interface TabsProps extends FlexProps, BorderBottom, BorderColor {}
  type TabsClass = React.StatelessComponent<TabsProps>
  export const Tabs: TabsClass

  interface TabProps
    extends FontSize,
      FontWeight,
      Space,
      Color,
      BorderBottom,
      BorderColor {}
  type TabClass = React.StatelessComponent<TabProps>
  export const Tab: TabClass

  interface BadgeProps
    extends FontSize,
      Space,
      Color,
      FontWeight,
      BorderRadius {}
  type BadgeClass = React.StatelessComponent<BadgeProps>
  export const Badge: BadgeClass

  interface CircleProps
    extends Size,
      AlignItems,
      BorderRadius,
      TextAlign,
      Size {}
  type CircleClass = React.StatelessComponent<CircleProps>
  export const Circle: CircleClass

  interface DotProps
    extends Space,
      Size,
      Color,
      BorderRadius,
      Border,
      BorderColor {}
  type DotClass = React.StatelessComponent<DotProps>
  export const Dot: DotClass

  interface ArrowProps extends Space, Color {
    direction?: 'up' | 'down'
  }
  type ArrowClass = React.StatelessComponent<ArrowProps>
  export const Arrow: ArrowClass

  interface DonutProps extends Color, Space {
    strokeWidth?: number
    size?: number
    value?: any
  }
  type DonutClass = React.StatelessComponent<DonutProps>
  export const Donut: DonutClass

  interface PositionProps
    extends Space,
      Color,
      zIndex,
      Top,
      Right,
      Bottom,
      Left {}
  type PositionClass = React.StatelessComponent<PositionProps>
  export const Position: PositionClass

  export const Relative: PositionClass
  export const Absolute: PositionClass
  export const Fixed: PositionClass
  export const Sticky: PositionClass

  interface ModalProps
    extends PositionClass,
      BorderRadius,
      MaxWidth,
      MaxHeight {}
  type ModalClass = React.StatelessComponent<ModalProps>
  export const Modal: ModalClass
  export const Overlay: ModalClass

  interface DrawerProps extends Position, Space, Color, zIndex {
    open?: boolean
    position?: 'top' | 'right' | 'bottom' | 'left'
    size?: number
  }
  type DrawerClass = React.StatelessComponent<DrawerProps>
  export const Drawer: DrawerClass

  interface CarouselProps extends FlexProps, Width, Space, Color {
    index?: number
  }
  type CarouselClass = React.StatelessComponent<CarouselProps>
  export const Carousel: CarouselClass

  interface TooltipProps extends Color {
    text?: string
  }
  type TooltipClass = React.StatelessComponent<TooltipProps>
  export const Tooltip: TooltipClass
}
