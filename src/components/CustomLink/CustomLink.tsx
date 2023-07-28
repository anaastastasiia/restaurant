import { Link, NavLinkProps, useMatch } from 'react-router-dom';

interface CustomLinkProps {
  children?: React.ReactNode;
  to: any;
  props?: NavLinkProps;
}

export const CustomLink = ({ children, to, ...props }: CustomLinkProps) => {
  const match = useMatch(to);
  console.log(match);
  return (
    <Link to={to} style={{ color: match ? ' grey' : 'white' }} {...props}>
      {children}
    </Link>
  );
};
