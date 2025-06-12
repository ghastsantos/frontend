import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterWrapper = styled.footer`
  color: #fff;
  padding: 40px 20px;
  width: 100%;
  font-size: 14px;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 200px;
`;

export const FooterSection = styled.div`
  flex: 1 1 200px;
  min-width: 200px;

  h3 {
    margin-bottom: 16px;
    font-weight: bold;
  }
`;

export const Logo = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const LogoLink = styled(Link)`
  display: inline-block; // Para garantir que o link se comporte bem com a imagem
  img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
  }
`;

export const FooterLink = styled.a`
  display: block;
  color: #ccc;
  margin-bottom: 10px;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #5d53b3;
  }
`;

export const Socials = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
`;

export const SocialIcon = styled.a`
  color: #ccc;
  font-size: 24px; /* aumentei para ficar mais visível */
  transition: color 0.3s;

  &:hover {
    color: #5d53b3;
  }
`;


export const FooterBottom = styled.div`
  margin-top: 40px;
  text-align: center;
  color: #777;
`;
