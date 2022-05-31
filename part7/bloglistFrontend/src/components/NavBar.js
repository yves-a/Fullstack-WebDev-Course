import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
const NavBar = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
  }
  if (user) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Navbar.Text>
              {user.name} logged in <Button onClick={logout}>logout</Button>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
