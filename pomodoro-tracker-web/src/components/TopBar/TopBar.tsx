import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import useAuthActions from '../../services/firebase/hooks/useAuthActions';
import { useAppContext } from '../../store/AppContext';

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 10px;
`;

const UserName = styled.p`
  margin-right: 10px;
`;

const AuthBtn = styled.button`
  border: none;
  color: ${COLORS.CYAN};
  font-size: 16px;
  background-color: white;
  cursor: pointer;
`;

const TopBar = () => {
  const { state } = useAppContext();
  const { logInWithFirebase, logoutWithFirebase } = useAuthActions();

  return (
    <Wrapper>
      <InnerWrapper>
        <div>Pomodor Tracker</div>
        <div>
          {state.user ? (
            <UserData>
              {state.user.photoURL && (
                <Avatar src={state.user.photoURL} alt="avatar" />
              )}
              <UserName>
                {state.user.displayName || state.user.email || 'User Name'}
              </UserName>
              <AuthBtn onClick={() => logoutWithFirebase()}>Sign out</AuthBtn>
            </UserData>
          ) : (
            <AuthBtn onClick={() => logInWithFirebase()}>
              Sign in with Google
            </AuthBtn>
          )}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default TopBar;
