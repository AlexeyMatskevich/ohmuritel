import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USERS = gql`
    {
        users{
            email,
            fullName
        }
    }
`;

export default function Users() {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.users.map(({ email, fullName }) => (
        <div>
            <p>
                {email}: {fullName}
            </p>
        </div>
    ));
}