import React, { PureComponent } from "react";
import defaultProps from "recompose/defaultProps";
import Menu from "./Menu";

class App extends PureComponent {
  render() {
    const action = message => {
      console.log(message);
    };

    const menuItems = [
      {
        icon: "clock-o",
        label: "Recent Items",
        subtitle: "Items you've visited recently",
        url: "/recent-items",
        action: action("Recent")
      },
      {
        icon: "thermometer-full",
        label: "Hot Stuff",
        subtitle: "The heat is on",
        action: action("It's getting hot in here...")
      },
      {
        icon: "anchor",
        label: "Stop The Boat",
        url: "/stop-the-boat",
        action: action("Anchors Away!")
      },
      {
        icon: "money",
        label: "Show Me The Money",
        action: action("SHOW ME THE MONEY!")
      }
    ];

    const moreItems = [
      ...menuItems,
      {
        icon: "fast-forward",
        label: "Must Go Faster",
        subtitle: "Don't slow down!",
        action: action("Faster!")
      },
      {
        icon: "facebook-official",
        label: "TheFaceBook",
        url: "/facebook-react",
        action: action("Thanks for React FB!")
      }
    ];

    const MenuDefault = defaultProps({
      style: { marginRight: ".5rem" },
      windowSize: "small",
      renderButton: ({ getToggleButtonProps }) => (
        <button {...getToggleButtonProps()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Ei-sc-github.svg"
            alt="menu"
          />
        </button>
      ),
      onMenuToggle: action("Menu Toggle"),
      menuItems,
      navigateTo: action("navigateTo")
    })(Menu);
    return (
      <div
        style={{
          position: "relative",
          width: `100%`,
          height: `100vh`,
          backgroundColor: "gray",
          overflowY: "auto",
          padding: "20px"
        }}
      >
        {/*
      */}
        <MenuDefault placement="bottom-start" />
        <MenuDefault mobileStyle="bottom" />
        <MenuDefault mobileStyle="right" menuItems={moreItems} />
      </div>
    );
  }
}

export default App;
