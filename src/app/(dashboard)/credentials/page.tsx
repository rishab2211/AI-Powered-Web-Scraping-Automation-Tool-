import { GetCredentialsForUser } from "@/actions/credentials/getCredentialsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LockKeyholeIcon, ShieldIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateCredentialsDialouge from "./_components/CreateCredentialsDialouge";
import { formatDistanceToNow } from "date-fns";
import DeleteCredentialDialog from "./_components/DeleteCredentialDialouge";

type Props = {};

const CredentialsPage = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className=" flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl ">Credentials</h1>
          <p className="font-semibold text-muted-foreground">
            Manage your credentials
          </p>
        </div>
        <CreateCredentialsDialouge />
      </div>

      <div className="h-full py-6 space-y-8 ">
        <Alert>
          <ShieldIcon className="h-4 w-4 stroke-primary" />
          <AlertTitle>Encryption</AlertTitle>
          <AlertDescription>
            All information is securely encrypted, ensuring your data remains
            safe.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  );
};

export default CredentialsPage;

async function UserCredentials() {
  const credentials = await GetCredentialsForUser();

  if (!credentials) {
    return <div>Something went wrong</div>;
  }
  if (credentials.length === 0) {
    return (
      <Card className="w-full p-4">
        <div>
          <div className="flex items-center gap-4">
            <ShieldIcon className="h-10 w-10 stroke-primary" />
            <div>
              <div className="flex flex-col gap-1 ">
                <p className="font-semibold text-xl">
                  No credentials created Yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Click the button below to create your first credential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <div>
      {credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
        });

        return (
          <Card key={credential.id} className="p-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <LockKeyholeIcon size={22} className="stroke-primary" />
                <div>
                  <p className="font-bold">{credential.name}</p>
                  <p>{createdAt}</p>
                </div>
              </div>
              <DeleteCredentialDialog name={credential.name} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
