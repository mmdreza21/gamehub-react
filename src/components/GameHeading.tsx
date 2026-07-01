import useGenres from "../hooks/useGenres";
import { Box, Heading } from "@chakra-ui/react";
import useGameQueryStore from "../store/gameQueryStore";

function GameHeading() {
  const selectedGenreId = useGameQueryStore((state) => state.gameQuery.genreId);
  const { data: genres } = useGenres();

  return (
    <Box pl={5} pt={5} marginTop={2}>
      <Heading as={"h1"} size={"xl"}>
        {selectedGenreId
          ? genres?.find((g) => g.id === selectedGenreId)?.name + " Games"
          : "All Games"}
      </Heading>
    </Box>
  );
}

export default GameHeading;
