import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";


const NavBar = () => {
  const { activityStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to='/activities'/>
        <Menu.Item name="Activities">
          <Button as={NavLink} to='/createActivity' positive content="Create Activity" onClick={() => activityStore.openForm()} />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar;