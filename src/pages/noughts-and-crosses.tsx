import React, {
  FunctionComponent,
  ButtonHTMLAttributes,
  useState,
} from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import clsx from 'clsx';
import { Anchor } from '../components/anchor';
import Layout from '../components/layout';
import { StyledLink } from '../components/styled-go-back';
import { GoBack } from '../components/svgs';

import { Main } from '../components';
import { SEO } from '../components/seo';

type Squares = (null | 'X' | 'O')[];

const Square: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  onClick,
  ...props
}) => (
  <button
    {...props}
    className={clsx('w-full h-20 md:h-40 border', className)}
    onClick={onClick}
  >
    {children}
  </button>
);

const Board: FunctionComponent<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    squares: Squares;
    onClick: (arg0: number) => void;
  }
> = ({ onClick, squares, ...props }) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        onClick={() => onClick(i)}
        aria-label={`game board, position: ${i % 3} ${Math.floor(i / 3)}`}
        role="button"
        className="w-1/3"
      >
        {squares[i]}
      </Square>
    );
  };

  return (
    <div className="flex flex-wrap w-full">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  );
};

const Game = () => {
  const [state, setState] = useState<{
    history: {
      squares: Squares;
    }[];
    stepNumber: number;
    xIsNext: boolean;
  }>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState(prevState => ({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext,
    }));
  };

  const jumpTo = (step: number) => {
    setState(prevState => ({
      ...prevState,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));
  };

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="w-full">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </>
  );
};

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

interface Props extends PageProps<Queries.NoughtsAndCrossesQuery> {}

export const Head: HeadFC<Queries.NoughtsAndCrossesQuery> = ({ data }) => {
  return (
    <SEO
      description="The noughts and crosses project in David Murdoch's portfolio"
      title="Noughts and Crosses"
    >
      <title>{data?.site?.siteMetadata?.title} | Noughts and Crosses</title>
    </SEO>
  );
};

const NoughtsAndCrosses: FunctionComponent<Props> = ({ data, location }) => {
  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as Queries.ContentfulPerson}>
      <Main className="px-6 py-8 w-full">
        <StyledLink to="/#projects" className="group">
          <GoBack className="styled-go-back" aria-label="Go Back" />
        </StyledLink>
        <h1 className="text-4xl text-teal-600 tracking-widest uppercase">
          Noughts and Crosses
        </h1>

        <p className="text-gray-900">
          The tutorial example from{' '}
          <Anchor href="https://reactjs.org/tutorial/tutorial.html">
            reactjs docs
          </Anchor>{' '}
          re-styled and with types
        </p>

        <Game />
      </Main>
    </Layout>
  );
};

export default NoughtsAndCrosses;

export const pageQuery = graphql`
  query NoughtsAndCrosses {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPerson {
      name
      image {
        gatsbyImage(
          cropFocus: FACES
          layout: FULL_WIDTH
          placeholder: BLURRED
          height: 192
          width: 192
        )
      }
    }
  }
`;
