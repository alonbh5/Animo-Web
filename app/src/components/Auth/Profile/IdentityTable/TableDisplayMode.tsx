
import { User } from '../../../api/configuration/models/users';

export const TableDisplayMode = (props: { user: User }) => {
    const { user } = props;
    const getRole = (roleid?: number) => {
        if (roleid === 1) {
            return 'Admin';
        } else if (roleid === 2) {
            return 'Psycholigist';
        } else {
            return "General"
        }
    }
    return (
        <tbody>
            <tr>
                <td>First Name</td>
                <td>{user.first_name}</td>
            </tr>
            <tr>
                <td>Last Name</td>
                <td>{user.last_name}</td>
            </tr>
            <tr>
                <td>Email Address</td>
                <td>{user.email}</td>
            </tr>
            <tr>
                <td>Age</td>
                <td>{user.age}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>{user.gender}</td>
            </tr>
            <tr>
                <td>Role</td>
                <td>{getRole(user.role_id)}</td>
            </tr>
        </tbody>
    )
}