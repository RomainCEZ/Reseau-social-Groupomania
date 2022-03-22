import { Link } from 'react-router-dom'

export default function BlueButton({children, path}) {
    return (
        <Link to={path} className="flex justify-center p-2 mb-3 rounded bg-blue-900 text-white px-6">
            {children}
        </Link>
    )
}