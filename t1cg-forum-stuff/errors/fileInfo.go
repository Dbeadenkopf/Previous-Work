package errors

import (
	"fmt"
	"path/filepath"
	"runtime"
)

var ignores = [...]string{
	".func1",
	".func2",
	".func4",
	".func5",
	"runtime.",
	"testing.tRunner",
	".0",
}

// GetFileData returns formatted string containing the file name, line number,
// package, and function name of the code at the specified depth. The default
// depth value is 1, which will return the data for the location of the caller.
// Specifying a higher number will move further down the call stack
func GetFileData(depth ...int) string {

	var selectedDepth int

	if depth == nil {
		selectedDepth = 1
	} else {
		selectedDepth = depth[0]
	}

	pc, file, line, _ := runtime.Caller(selectedDepth)

	fileName := filepath.Base(file)
	f := runtime.FuncForPC(pc)
	functionName := filepath.Base(f.Name())

	return fmt.Sprintf("%s:%d %s", fileName, line, functionName)
}
