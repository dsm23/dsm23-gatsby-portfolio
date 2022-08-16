import tw, { styled } from 'twin.macro';
import { Link } from 'gatsby';

import { GoBack } from '../svgs';

const StyledGoBack = styled(GoBack)({
  path: tw`fill-current transition transform duration-500 ease-in-out text-green-700 group-hover:text-white`,
});

const StyledLink = tw(
  Link,
)`transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full outline-none bg-gray-100 hover:(bg-green-900 scale-125) focus:(border-2 border-yellow-500)`;

export { StyledGoBack as GoBack, StyledLink };
