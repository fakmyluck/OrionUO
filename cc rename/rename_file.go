package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func getfilepath() string {
	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}
	dir := filepath.Dir(ex)
	fmt.Println(dir)
	return dir
}

func rename(name string, num int, c int) {

	//num,c:=return_int(name)

	//fmt.Println(name[0:c])

	newName := strings.ReplaceAll(name, name[0:c], strconv.Itoa(num)) ///<<<<<<
	fmt.Println(name, "\t -> ", newName)

	//os.Rename(filepath.Join(dir, name), filepath.Join(dir, newName))

}

func return_int(name string) (num int, string_pos int) {
	for i := 0; i < len(name); i++ {
		if '0' <= name[i] && name[i] <= '9' {
			num = num*10 + int(name[i]-'0')
			continue
		}
		string_pos = i
		return
	}
	fmt.Println("\n len(", name, ") =", len(name))
	panic(1)
}

func main() {

	dir := getfilepath()

	list, err := os.ReadDir(dir)
	if err != nil {
		panic(err)
	}

	fmt.Println("os.ReadDir(dir)=", list)

	var min_num, last_int, skip = 0, 0, 0
	for s, each := range list {
		tmp, _ := return_int(each.Name())
		if tmp == min_num+1 {
			min_num = tmp
		} else if tmp > min_num {
			skip = s
			last_int = tmp
			break
		}
	}
	last_int = min_num
	//min_num++
	fmt.Printf("min_num=%v\n", min_num)

	for s, each := range list {
		if s < skip {
			continue
		}

		name := each.Name()

		tmp, string_pos := return_int(name)

		if tmp > last_int {
			min_num++
			last_int = tmp
		}

		rename(name, min_num, string_pos) //dobavit' string_pos

	}

	fmt.Print("Nazmi 'Enter' cc...")
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}
