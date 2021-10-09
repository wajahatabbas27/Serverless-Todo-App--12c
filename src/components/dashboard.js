import React, { useContext, useRef } from "react";
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
import { gql, useMutation, useQuery } from "@apollo/client";

//mutation
const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(text: "one todo") {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

//QUERY GET_TODOS
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

// const todosReducer = (state, action) => {
//   switch (action.type) {
//     case "addTodo":
//       return [{ done: false, value: action.payload }, ...state];
//     case "toggleTodoDone":
//       const newState = [...state];
//       newState[action.payload] = {
//         done: !state[action.payload].done,
//         value: state[action.payload].value,
//       };
//       return newState;
//     default:
//       return state;
//   }
// };

let Dash = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  // const [todos, dispatch] = useReducer(todosReducer, []);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const inputRef = useRef();

  console.log(data);

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
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          //dispatch({ type: "addTodo", payload: inputRef.current.value });
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>

      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>Loading....</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!error && !loading && (
          <ul sx={{ listStyleType: "none" }}>
            {data.todos.map((todo) => (
              <Flex
                as='li'
                key={todo.id}
                onClick={async () => {
                  await updateTodoDone({ variables: { id: todo.id } });
                  await refetch();
                  // dispatch({ type: "toggleTodoDone", payload: i });
                }}
              >
                <Checkbox checked={todo.done} />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
};

export default Dash;
