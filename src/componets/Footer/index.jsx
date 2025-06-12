import React from 'react';
import {
  FooterWrapper,
  FooterContainer,
  FooterSection,
  Logo,
  LogoLink,
  FooterLink,
  Socials,
  SocialIcon,
  FooterBottom
} from './styles';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logoImg from '../../assets/logo.png';


const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <LogoLink to="/">
            <img src={logoImg} alt="GBC Sports Logo" />
          </LogoLink>
          <p>Loja oficial para os fãs de futebol. Produtos, acessórios e muito mais.</p>
        </FooterSection>

        <FooterSection>
          <h3>Links úteis</h3>
          <FooterLink href="#">Sobre nós</FooterLink>
          <FooterLink href="#">Contato</FooterLink>
          <FooterLink href="#">Ajuda</FooterLink>
          <FooterLink href="#">Termos e Condições</FooterLink>
        </FooterSection>

        <FooterSection>
          <h3>Redes Sociais</h3>
          <Socials>
            <SocialIcon href="#" aria-label="Facebook">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <FaTwitter />
            </SocialIcon>
          </Socials>
        </FooterSection>
      </FooterContainer>

      <FooterBottom>
        &copy; {new Date().getFullYear()} GBC Sports. Todos os direitos reservados.
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
