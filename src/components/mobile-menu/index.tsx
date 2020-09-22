import tw, { styled, theme } from 'twin.macro';

interface Props {
  isOpen: boolean;
}

const MobileMenu = styled.div<Props>(({ isOpen }) => [
  tw`w-full transition-all transform duration-500 ease-in-out h-0 md:(h-auto flex items-center ml-auto w-auto) lg:block lg:w-full`,
  {
    maxHeight: `calc(100% - ${theme`height.20`})`,
  },
  isOpen && {
    height: '20rem',
  },
]);

export default MobileMenu;
