import unittest
from generate_strategy import generate

class TestGeneration(unittest.TestCase):
    def test_output(self):
        result = generate({'business': 'Test app', 'audience': 'Test users'})
        self.assertTrue(len(result) > 0)

if __name__ == '__main__':
    unittest.main()
