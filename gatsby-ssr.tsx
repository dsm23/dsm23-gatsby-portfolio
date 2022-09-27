import type { GatsbySSR } from 'gatsby';

const HtmlAttributes = {
  lang: 'en',
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes(HtmlAttributes);
};
