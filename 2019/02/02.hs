import System.Environment
import qualified Data.Text as T

readF :: [T.Text] -> [Int]
readF = map (read . T.unpack)

replaceN :: Int -> [a] -> a -> [a]
replaceN loc xs val = x ++ val : ys
    where (x,_:ys)  = splitAt loc xs

addOp :: [Int] -> Int -> [Int]
addOp xs pos    = replaceN res xs sum
    where opp1  = xs!!(xs!!(pos+1))
          opp2  = xs!!(xs!!(pos+2))
          res   = xs!!(pos+3)
          sum   = opp1 + opp2

mulOp :: [Int] -> Int -> [Int]
mulOp xs pos    = replaceN res xs diff
    where opp1  = xs!!(xs!!(pos+1))
          opp2  = xs!!(xs!!(pos+2))
          res   = xs!!(pos+3)
          diff  = opp1 * opp2

opcodes :: [Int] -> Int -> Int
opcodes xs pos
        | (xs!!pos == 1) = opcodes (addOp xs pos) (pos + 4)
        | (xs!!pos == 2) = opcodes (mulOp xs pos) (pos + 4)
        | (xs!!pos == 99) = xs!!0
        | otherwise = error "Invalid opcode"

findInput :: [Int] -> Int -> Int -> (Int, Int)
findInput xs val perm
        | (res == val) = (noun, verb)
        | otherwise = findInput xs val (perm+1)
        where
          (noun, verb) = permutations!!perm
          xsWithNoun = replaceN 1 xs noun
          xsWithVerb = replaceN 2 xsWithNoun verb
          res = opcodes xsWithVerb 0

permutations :: [(Int, Int)]
permutations = [(noun, verb) | noun <- [0..99], verb <- [0..99]]
    
main = do
    [f]     <- getArgs
    rawInput <- readFile f
    let input = (lines rawInput)!!0 
    let program = readF (T.splitOn (T.pack ",") (T.pack input))
    print (findInput program 19690720 0)