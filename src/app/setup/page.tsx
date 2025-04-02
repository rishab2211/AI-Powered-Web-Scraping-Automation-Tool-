import { waitFor } from "@/lib/helper"

type Props = {}

const SetupPage = async (props: Props) => {

    await waitFor(5000)
  return (
    <div>SetupPage</div>
  )
}

export default SetupPage