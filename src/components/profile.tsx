import {
  useAccounts,
  useUpdateProfileAdditionalProperty,
} from '@futureverse/asset-register-react/profiles'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useCallback, useState } from "react";

export const ProfileComponent = () => {
    const { updateAsync } = useUpdateProfileAdditionalProperty()
    const [value, setValue] = useState('')
    const [profileId, setProfileId] = useState('')

    const { accounts, reactQuery: accountsReactQuery } = useAccounts({
        addresses: ['0xFfFFFfff000000000000000000000000000004FC'],
        experience: 'dashboard',
      })

      const updateProfile = useCallback(async (value: string, profileId: string) => {
        await updateAsync({
          profileId: profileId,
          key: 'candy-id',
          value: value,
          owner: '0xffffffff000000000000000000000000000004fc',
        })
        await accountsReactQuery.refetch()
      }, [])

    return (
        <div className="p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Profile Component</h1>
            <ul className="space-y-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter Candy ID"
                    className="p-2 border rounded"
                    onChange={(e) => setValue(e.target.value)}
                />
                <select
                    className="p-2 border rounded ml-2"
                    onChange={(e) => setProfileId(e.target.value)}
                >
                    <option value="">Select Profile ID</option>
                    {accounts?.flatMap(account => 
                        account.profiles.map((profile: { profileId: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                            <option key={String(profile.profileId)} value={String(profile.profileId)}>
                                {profile.profileId}
                            </option>
                        ))
                    )}
                </select>
                <button
                    onClick={() => updateProfile(value, profileId)}
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    Update Candy ID
                </button>
            </div>
            {accounts?.map((account) => (
                <div key={account.id} className="p-4 rounded-lg shadow-sm">
                <li className="mb-2"><span className="font-semibold">ID:</span> {account.id}</li>
                <li className="mb-2"><span className="font-semibold">Address:</span> {account.address}</li>
                <li className="mb-2"><div>
                    <span className="font-semibold">Profile:</span>
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(
                            account.profiles.map((profile: { displayName: any; owner: any; profileId: any; additionalProperties: any; }) => ({
                                displayName: profile.displayName,
                                owner: profile.owner,
                                profileId: profile.profileId,
                                additionalProperties: profile.additionalProperties,
                            })),
                            null,
                            2
                        )}
                    </pre>
                </div></li>
                </div>
            ))}
            </ul>
        </div>
    );
};
