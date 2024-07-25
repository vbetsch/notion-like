import Loading from "./Loading";

interface DynamicProperties {
    loading: boolean
    children: JSX.Element
}

export default function DynamicLoading(props: DynamicProperties): JSX.Element {
    return (
        <div>
            {
                props.loading ? (
                    <Loading/>
                ) : (
                    props.children
                )
            }
        </div>
    )
}
