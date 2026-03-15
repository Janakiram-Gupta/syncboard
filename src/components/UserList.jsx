function UserList({ users }) {

  return (
    <div style={container}>

      <h4>Active Users</h4>

      {users.map((user) => (
        <div key={user} style={userItem}>
          {user}
        </div>
      ))}

    </div>
  );
}

const container = {
  position: "absolute",
  right: "10px",
  top: "10px",
  background: "white",
  padding: "10px",
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const userItem = {
  fontSize: "12px",
  padding: "2px 0"
};

export default UserList;