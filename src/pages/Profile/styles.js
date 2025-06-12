import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  padding: 150px 20px 40px 20px;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #1a1a1a;
`;

export const ProfileCard = styled.div`
  background: #232323;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 2px 12px #0002;
  max-width: 500px;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #5d53b3;
    margin-bottom: 32px;
    font-size: 2rem;
    font-family: 'Rubik', sans-serif;
  }

  form{
    width: 100%;
  }
`;

export const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  width: 100%;

  label {
    font-weight: bold;
    margin-bottom: 6px;
    color: #f3f3f3;
  }

  input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #444;
    background: #181818;
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
  }

  input:disabled {
    background: #232323;
    color: #aaa;
    border: 1px solid #333;
  }
`;

export const EditButton = styled.button`
  background: #5d53b3;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  transition: background 0.2s;
  &:hover {
    background: #4a429b;
  }
`;

export const SaveButton = styled(EditButton)`
  background: #4caf50;
  &:hover {
    background: #388e3c;
  }
`;

export const LogoutButton = styled(EditButton)`
  background: #e74c3c;
  &:hover {
    background: #c0392b;
  }
`;

export const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 12px;
  text-align: center;
  font-weight: bold;
`;