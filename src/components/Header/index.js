import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import ThemeContext from '../../context/ThemeContext'

import {
  NavHeader,
  LogoLink,
  WebsiteLogo,
  OptionsContainer,
  DarkModeButton,
  UserProfileImage,
  LogoutButton,
  ModalContainer,
  CloseButton,
  ConfirmButton,
  ModalDesc,
  ButtonsContainer,
  DesktopLogoutButton,
} from './styledComponents'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const color = isDarkTheme ? '#ffffff' : '#00306e'
      const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'

      const onChangeTheme = () => {
        toggleTheme()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <NavHeader bgColor={bgColor}>
          <LogoLink to="/">
            <WebsiteLogo
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
            />
          </LogoLink>
          <OptionsContainer>
            <DarkModeButton
              type="button"
              onClick={onChangeTheme}
              data-testid="theme"
            >
              {isDarkTheme ? (
                <BsBrightnessHigh color="#ffffff" size={25} />
              ) : (
                <BsMoon size={25} />
              )}
            </DarkModeButton>
            <UserProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <LogoutButton type="button" bgColor={bgColor} color={color}>
                  Logout
                </LogoutButton>
              }
            >
              {close => (
                <ModalContainer>
                  <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>

                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <DesktopLogoutButton type="button">
                  <FiLogOut size={25} color={color} />
                </DesktopLogoutButton>
              }
              className="popup-content"
            >
              {close => (
                <ModalContainer>
                  <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>

                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
          </OptionsContainer>
        </NavHeader>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
