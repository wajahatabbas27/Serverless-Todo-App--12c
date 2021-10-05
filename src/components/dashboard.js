import React, { useContext, useReducer, useRef } from "react";
import { Link } from "@reach/router";
import {
  Container,
  Flex,
  NavLink,
  Label,
  Input,
  Button,
  Checkbox,
} from "theme-ui";
import { IdentityContext } from "../../identity-context";

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
    default:
      return state;
  }
};

let Dash = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();
  return (
    <Container>
      <Flex as='nav'>
        <NavLink as={Link} to={"/"} p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href='#!'
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <br />
      <br />
      <Flex
        as='form'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addTodo", payload: inputRef.current.value });
          inputRef.current.value = "";
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>

      <Flex sx={{ flexDirection: "column" }}>
        <ul sx={{ listStyleType: "none" }}>
          {todos.map((todo, i) => (
            <Flex
              as='li'
              onClick={() => {
                dispatch({ type: "toggleTodoDone", payload: i });
              }}
            >
              <Checkbox checked={todo.done} />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};

export default Dash;
