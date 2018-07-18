import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import FontAwesome from "react-fontawesome";
import { Manager, Reference, Popper } from "react-popper";
import Downshift from "downshift";

const slideUpFrames = {
  "0%": {
    transform: "translateY(100px)"
  },

  "100%": {
    transform: "translateY(0)"
  }
};

const slideLeftFrames = {
  "0%": {
    transform: "translateX(100px)"
  },

  "100%": {
    transform: "translateX(0px)"
  }
};

const styles = StyleSheet.create({
  rootElement: {
    display: "inline-block" /* leave positioning / layout to parent  */
  },
  desktopMenuContainer: {
    padding: 0
  },
  slideUp: {
    display: "inline-block",
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 0,
    animationName: slideUpFrames,
    animationDuration: ".5s"
  },
  slideLeft: {
    display: "inline-block",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 0,
    animationName: slideLeftFrames,
    animationDuration: ".5s"
  },
  menuItem: {
    listStyle: "none",
    position: "relative",
    padding: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    color: "#293b65",
    backgroundColor: "#fff",
    borderBottom: "1px solid #dfe1e6",
    ":hover": {
      backgroundColor: "#293b65",
      color: "#fff"
    }
  },
  menuIcon: {
    marginRight: "0.5rem"
  },
  menuIconRight: {
    marginLeft: "0.5rem"
  },
  bottomMenu: {},
  bottomMenuContainer: {
    width: "100%",
    margin: 0
  },
  bottomMenuCloseButton: {
    color: "#fff"
  },
  bottomMenuClosePanel: {
    textAlign: "right",
    padding: ".5rem"
  },
  rightMenuTop: {
    padding: "1.5rem",
    color: "#fff",
    backgroundColor: "#293b65",
    borderBottom: "1px solid rgba(255,255,255, 0.35)",
    cursor: "default",
    textAlign: "right"
  },
  rightMenuTopIcon: {
    width: "2.5rem",
    backgroundColor: "#fff",
    borderRadius: "50%"
  },
  rightMenu: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#fff",
      color: "#293b65"
    }
  },
  linkCursor: {
    cursor: "pointer"
  },
  floatLeft: {
    left: "1rem",
    top: "50%",
    position: "absolute",
    transform: "translateY(-50%)"
  },
  inlineBlock: { display: "inline-block", verticalAlign: "middle" },
  rightMenuContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#293b65"
  },
  subtitle: {
    fontSize: ".5rem",
    fontWeight: 400
  },
  userSelectNone: {
    userSelect: "none"
  },
  popperToggleButton: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    cursor: "pointer",
    border: 0
  }
});

class Menu extends PureComponent {
  state = {
    isOpenInternal: false
  };
  render() {
    const {
      menuItems,
      mobileStyle,
      renderButton,
      isOpen: isOpenExternal,
      onMenuToggle,
      windowSize,
      navigateTo,
      placement,
      style
    } = this.props;
    const c = this;
    const { isOpenInternal } = this.state;
    const mobileSizes = ["medium", "small", "tiny"];
    const isMobileView = mobileSizes.indexOf(windowSize) >= 0;
    const isBottomMenu = mobileStyle === "bottom";
    const isRightMenu = mobileStyle === "right";
    const shouldUseDesktopMenu =
      !isMobileView || (isMobileView && mobileStyle === "none");
    const isExternalOpenPropSet = isOpenExternal !== undefined;
    const showPopper = isExternalOpenPropSet ? isOpenExternal : isOpenInternal;
    console.log("RERENDER FlexMenu");
    console.log("isOpenExternal:", isOpenExternal);
    console.log("isOpenInternal:", isOpenInternal);
    console.log("isExternalOpenPropSet:", isExternalOpenPropSet);
    console.log("showPopper:", showPopper);
    console.log("windowSize:", windowSize);
    console.log("shouldUseDesktopMenu:", shouldUseDesktopMenu);

    const onToggleMenu = () => {
      this.setState(prevState => ({
        isOpenInternal: !prevState.isOpenInternal
      }));
      onMenuToggle();
    };

    const MenuItems = ({
      className,
      getMenuProps,
      getItemProps,
      closeMenu
    }) => (
      <ul className={className} {...getMenuProps()}>
        {isRightMenu && (
          <li className={css(styles.menuItem, styles.rightMenuTop)}>
            <FontAwesome
              onClick={() => {
                closeMenu();
                onToggleMenu();
              }}
              fixedWidth
              className={css([styles.linkCursor, styles.floatLeft])}
              name="times"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Ei-sc-github.svg"
              className={css(styles.rightMenuTopIcon)}
            />
          </li>
        )}
        {isBottomMenu && (
          <div className={css(styles.bottomMenuClosePanel)}>
            <FontAwesome
              onClick={() => {
                closeMenu();
                onToggleMenu();
              }}
              fixedWidth
              className={css([styles.linkCursor, styles.bottomMenuCloseButton])}
              name="times"
            />
          </div>
        )}
        {menuItems.map(item => (
          <li
            {...getItemProps({ item: item.label })}
            onClick={() => {
              if (typeof item.action === "function") item.action();
              navigateTo(item.url || "/");
            }}
            key={item.label}
            className={css(
              styles.menuItem,
              isBottomMenu && styles.bottomMenu,
              isRightMenu && [styles.rightMenuTop, styles.rightMenu]
            )}
          >
            <FontAwesome
              fixedWidth
              className={css([styles.menuIcon, styles.inlineBlock])}
              name={item.icon}
            />
            <span className={css([styles.menuIcon, styles.inlineBlock])}>
              <div>{item.label}</div>
              {item.subtitle && (
                <div className={css(styles.subtitle)}>{item.subtitle}</div>
              )}
            </span>
            {isRightMenu && (
              <FontAwesome
                fixedWidth
                className={css([styles.menuIconRight, styles.inlineBlock])}
                name="angle-right"
              />
            )}
          </li>
        ))}
      </ul>
    );
    return (
      <div className={css(styles.rootElement)} style={style}>
        <Manager>
          <Downshift style={{ display: "inline-block", position: "relative" }}>
            {({
              getToggleButtonProps,
              getMenuProps,
              getItemProps,
              isOpen,
              closeMenu
            }) => {
              console.log("downshift isOpen:", isOpen);
              return (
                <div>
                  <Reference>
                    {({ ref }) => (
                      <span
                        onClick={onToggleMenu}
                        className={css(styles.userSelectNone)}
                      >
                        {renderButton({
                          getToggleButtonProps: () => {
                            // override event handlers to update internal state
                            return {
                              ...getToggleButtonProps(),
                              ref,
                              "data-toggle-button": "",
                              className: css(styles.popperToggleButton),
                              onBlur(event) {
                                console.log("INTERNAL onBlur");
                                getToggleButtonProps().onBlur(event);
                                c.setState({ isOpenInternal: false });
                                closeMenu();
                              },
                              onKeyUp(event) {
                                console.log("INTERNAL onKeyUp");
                                getToggleButtonProps().onKeyUp(event);
                                c.setState({ isOpenInternal: false });
                                closeMenu();
                              }
                            };
                          }
                        })}
                      </span>
                    )}
                  </Reference>
                  {showPopper &&
                    isOpen &&
                    (shouldUseDesktopMenu ? (
                      <Popper placement={placement}>
                        {({ ref, placement, style }) => (
                          <div
                            ref={ref}
                            style={style}
                            data-placement={placement}
                          >
                            <MenuItems
                              getMenuProps={getMenuProps}
                              getItemProps={getItemProps}
                              closeMenu={closeMenu}
                              className={css(styles.desktopMenuContainer)}
                            />
                          </div>
                        )}
                      </Popper>
                    ) : (
                      <MenuItems
                        getMenuProps={getMenuProps}
                        getItemProps={getItemProps}
                        closeMenu={closeMenu}
                        className={css(
                          isBottomMenu && styles.slideUp,
                          isBottomMenu && styles.bottomMenuContainer,
                          isRightMenu && styles.slideLeft,
                          isRightMenu && styles.rightMenuContainer
                        )}
                      />
                    ))}
                </div>
              );
            }}
          </Downshift>
        </Manager>
      </div>
    );
  }
}

Menu.propTypes = {
  renderButton: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
      action: PropTypes.func
    })
  ).isRequired,
  style: PropTypes.object,
  mobileStyle: PropTypes.oneOf(["none", "bottom", "right"]),
  isOpen: PropTypes.bool,
  onMenuToggle: PropTypes.func,
  navigateTo: PropTypes.func,
  placement: PropTypes.string
};

Menu.defaultProps = {
  style: {},
  mobileStyle: "none",
  onMenuToggle: () => {},
  navigateTo: () => {},
  placement: "auto"
};

export default Menu;
