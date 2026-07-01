import {
  HStack,
  Icon,
  List,
  ListItem,
  Spinner,
  Text,
  Box,
  Badge,
  VStack,
  Card,
  Flex,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import { FaGamepad } from "react-icons/fa";
import { getSpecificIconForGenre } from "../utils/genreIcons";
import type { GenreDTO } from "../types/GameTypes";
import { useState } from "react";
import useGameQueryStore from "../store/gameQueryStore";

function GenreList() {
  const { data: genres, isLoading: loading } = useGenres();
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null);

  const { gameQuery: selectedGenreId, setGenreId } = useGameQueryStore();

  const handleClick = (genre: GenreDTO | null) => {
    setGenreId(genre?.id || null);
  };

  if (loading) {
    return (
      <Box p={4}>
        <VStack align="stretch" m={3}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Card.Root minWidth={160} key={i} variant="outline" p={3}>
              <Flex align="center" gap={3}>
                <Spinner size="sm" />
                <Box flex="1">
                  <Box height="4" bg="gray.200" borderRadius="sm" mb={2} />
                  <Box height="3" width="20" bg="gray.100" borderRadius="sm" />
                </Box>
              </Flex>
            </Card.Root>
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
        Genres
      </Text>

      <List.Root variant="plain">
        <ListItem>
          <Card.Root
            cursor="pointer"
            onClick={() => handleClick(null)}
            onMouseEnter={() => setHoveredGenre(null)}
            onMouseLeave={() => setHoveredGenre(null)}
            transition="all 0.2s"
            _hover={{
              transform: "translateX(4px)",
              borderColor: "purple.300",
            }}
            minWidth={160}
            variant={"subtle"}
            p={3}
            pr={4}
          >
            <HStack>
              <Box
                p={2}
                borderRadius="md"
                bg="transparent"
                color={
                  selectedGenreId.genreId === null ? "purple.600" : "gray.100"
                }
              >
                <Icon as={FaGamepad} boxSize={5} />
              </Box>
              <VStack align="start" m={0} flex="1">
                <Text
                  fontWeight={
                    selectedGenreId.genreId === null ? "bold" : "semibold"
                  }
                >
                  All
                </Text>
              </VStack>
            </HStack>
          </Card.Root>
        </ListItem>

        {/* Genre Items */}
        {genres?.map((genre) => {
          const GenreIcon = getSpecificIconForGenre(genre.name);
          const isSelected = selectedGenreId.genreId === genre.id;
          const isHovered = hoveredGenre === genre.id;

          return (
            <ListItem key={genre.id} py={1}>
              <Card.Root
                cursor="pointer"
                onClick={() => handleClick(genre)}
                onMouseEnter={() => setHoveredGenre(genre.id)}
                onMouseLeave={() => setHoveredGenre(null)}
                transition="all 0.2s"
                _hover={{
                  transform: "translateX(4px)",
                  borderColor: "purple.300",
                }}
                variant={"subtle"}
                minWidth={160}
                p={3}
                pr={4}
              >
                <HStack>
                  <Box
                    p={2}
                    borderRadius="md"
                    bg="transparent"
                    color={isSelected ? "purple.600" : "gray.100"}
                    transition="all 0.2s"
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                  >
                    <Icon as={GenreIcon} boxSize={5} />
                  </Box>
                  <VStack align="start" m={0} flex="1">
                    <Text fontWeight={isSelected ? "bold" : "semibold"}>
                      {genre.name}
                    </Text>
                  </VStack>
                  {isHovered && !isSelected && (
                    <Badge variant="subtle" colorScheme="purple">
                      View
                    </Badge>
                  )}
                </HStack>
              </Card.Root>
            </ListItem>
          );
        })}
      </List.Root>
    </Box>
  );
}

export default GenreList;
