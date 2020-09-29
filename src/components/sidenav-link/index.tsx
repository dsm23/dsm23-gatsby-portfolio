import tw, { styled } from 'twin.macro';

const SideNavLink = styled.a`
  ${tw`flex items-center justify-start lg:justify-center uppercase w-full px-3 py-2 rounded hover:(bg-gray-900 text-white) focus:outline-none`}
`;

const SideNavSpan = tw.span`font-medium rounded group-focus:bg-yellow-500 group-focus:text-gray-900 h-full`;

export { SideNavLink, SideNavSpan };
