import { FullUser } from "core/user";
import { getPath } from "core/file";

import { Box, Flex, styled } from "@/lib/style/system/jsx";

type Props = {
  user: FullUser;
};

export function Profile({ user }: Props) {
  return (
    <Flex align="center" gap="s.250">
      <Box
        flexShrink="0"
        w="l.50"
        h="l.50"
        borderRadius="50%"
        overflow="hidden"
        bg="border"
      >
        {user.customer?.thumbnail && (
          <styled.img
            src={`/api/file/${getPath(user.customer.thumbnail, "webp@640")}`}
            alt={user.customer?.name}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        )}
      </Box>

      <Box flexShrink="1" overflow="hidden">
        <styled.p
          color="muted.foreground"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          ID: {user.customer?.id}
        </styled.p>
        <styled.h4 fontSize="1.5rem" fontWeight="bold">
          {user.customer?.name}
        </styled.h4>

        <styled.p mt="s.100" lineHeight="1.5">
          {user.customer?.employer?.name || user.customer?.employerName || ""}
        </styled.p>
        <styled.p lineHeight="1.5">{user.email}</styled.p>

        <styled.ul display="flex" alignItems="center" gap="s.150" mt="s.200">
          <li>
            <SNS
              name="instagram"
              isMuted={(user.customer?.instagramUrl || null) === null}
            />
          </li>
          <li>
            <SNS
              name="facebook"
              isMuted={(user.customer?.facebookUrl || null) === null}
            />
          </li>
          <li>
            <SNS name="x" isMuted={(user.customer?.xUrl || null) === null} />
          </li>
          <li>
            <SNS
              name="linkedin"
              isMuted={(user.customer?.linkedInUrl || null) === null}
            />
          </li>
        </styled.ul>
      </Box>
    </Flex>
  );
}

type SNSProps = {
  name: string;
  isMuted?: boolean;
};

function SNS({ name, isMuted }: SNSProps) {
  return (
    <styled.img
      src={`/images/icon_${name}${isMuted ? "_grey" : ""}.png`}
      alt={name}
      w="auto"
      h="m.50"
    />
  );
}
