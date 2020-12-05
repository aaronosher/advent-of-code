import System.Environment
import qualified Data.Text as T
import Data.List.Index

-- |Converts the list of Text values into a list of Ints
readF :: [T.Text] -> [Int]
readF = map (read . T.unpack)

-- |Selects range of a list
slice :: Int -> Int -> [a] -> [a]
slice from to xs = take (to - from + 1) (drop from xs)

-- |Replaces item in list by index
replaceN :: Int -> [a] -> a -> [a]
replaceN loc xs val = x ++ val : ys
    where (x,_:ys)  = splitAt loc xs

-- |Add operation
addOp :: [Int] -> Int -> [Int]
addOp xs pos    = replaceN res xs sum
    where opp1  = xs!!(xs!!(pos+1))
          opp2  = xs!!(xs!!(pos+2))
          res   = xs!!(pos+3)
          sum   = opp1 + opp2

-- |Multiply opperation
mulOp :: [Int] -> Int -> [Int]
mulOp xs pos    = replaceN res xs diff
    where opp1  = xs!!(xs!!(pos+1))
          opp2  = xs!!(xs!!(pos+2))
          res   = xs!!(pos+3)
          diff  = opp1 * opp2

-- |Parse modes
parseModes :: (Int, [Int]) -> [Int]
parseModes (count, modes)
              | count == len = reverse modes
              | len < count = parseModes (count, [0] ++ modes)
              | len > count = error "Too many modes"
            where
              len = length modes

-- |Parses opcode
parseOpcode :: Int -> (Int, [Int])
parseOpcode instruction
              | opcode == 1   = (1, parseModes (3, modes))
              | opcode == 2   = (2, parseModes (3, modes))
              | opcode == 3   = (3, parseModes (1, modes))
              | opcode == 4   = (4, parseModes (1, modes))
              | opcode == 99  = (99, [])
              | otherwise = (opcode, [])
            where
              ins = show instruction
              len = length ins
              opcode = read (slice (len - 1) len ins)
              modes = map (read . (:"")) (slice 0 (len - 3) ins) :: [Int]

-- |
getParam :: [Int] -> (Int, Int) -> Int
getParam xs (pos, mode)
              | mode == 0 = xs!!(xs!!pos)
              | mode == 1 = xs!!pos
              | otherwise = error "Invalid mode"

getPos :: Int -> (Int, Int) -> (Int, Int)
getPos pos (i, mode) = (i+pos+1, mode)

-- |Retrieves parameters based on modes
getParams :: [Int] -> Int -> [Int] -> [Int]
getParams xs pos iModes = map (\x -> getParam xs x) posModes  
      where
        posModes = map (\x -> getPos pos x) (indexed iModes)

-- |Runs the opcode program
opcodes :: [Int] -> Int -> [Int]
opcodes xs pos
        | (opcode == 1) = opcodes (addOp xs pos) (pos + 4)
        | (opcode == 2) = opcodes (mulOp xs pos) (pos + 4)
        | (opcode == 3) = opcodes (mulOp xs pos) (pos + 4)
        | (opcode == 4) = opcodes (mulOp xs pos) (pos + 4)
        | (opcode == 99) = xs
        | otherwise = error "Invalid opcode"
      where
        (opcode, modes) = parseOpcode (xs!!pos)
        params          = getParams xs pos modes

main = do
    [f]         <- getArgs
    rawInput    <- readFile f
    let input   = (lines rawInput)!!0 
    let program = readF (T.splitOn (T.pack ",") (T.pack input))
    print ((opcodes program 0)!!0)