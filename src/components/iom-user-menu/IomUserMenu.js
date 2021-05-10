import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Constants
import C from "../../store/constants";

// Styles
import "./IomUserMenu.scss";

// Utilities
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { useAuthContext } from "../../providers/IomAuthProvider";

// Elastic UI Components
import {
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiPopover,
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiButtonIcon,
} from "@elastic/eui";

const IomUserMenu = () => {
  const dispatch = useDispatch();
  const id = htmlIdGenerator()();
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuthContext();

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={() => setIsOpen(!isOpen)}
    >
      <EuiAvatar
        name={auth.user?.username || ""}
        initials={auth.user?.username.slice(0, 2).toUpperCase()}
        initialsLength={2}
        size="s"
      />
    </EuiHeaderSectionItemButton>
  );

  return !auth.user ? null : (
    <EuiPopover
      id={id}
      repositionOnScroll
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={() => setIsOpen(false)}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          alignItems="center"
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem>
            <EuiText>
              <p>{auth.user?.username}</p>
            </EuiText>
            <EuiText className="iom-user-menu__email">
              <p>{auth.user?.email}</p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="exit"
              aria-label="Sign out"
              color="accent"
              size="m"
              onClick={() => dispatch({ type: C.SIGNOUT })}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export default IomUserMenu;
