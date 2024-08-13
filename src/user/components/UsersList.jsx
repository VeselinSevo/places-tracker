import UserItem from "./UserItem";

export default function UsersList() {
    const USERS = [
        {
            id: 1,
            username: "jdoe",
            name: "John Doe",
            age: 28,
            image: "https://example.com/images/jdoe.jpg",
            places: [
                { name: "New York", location: "USA" },
                { name: "Tokyo", location: "Japan" },
            ],
        },
        {
            id: 2,
            username: "asmith",
            name: "Alice Smith",
            age: 34,
            image: "https://example.com/images/asmith.jpg",
            places: [
                { name: "London", location: "UK" },
                { name: "Paris", location: "France" },
            ],
        },
    ];

    return (
        <div className="container m-auto flex flex-col justify-center place-items-center gap-8 md:gap-4 my-4 px-10 md:my-10">
            {USERS.length > 0 ? (
                USERS.map((user) => <UserItem user={user} key={user.id} />)
            ) : (
                <h2>Users not found</h2>
            )}
        </div>
    );
}
