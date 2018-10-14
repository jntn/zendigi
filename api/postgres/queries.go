//go:generate go-bindata -ignore=\.go -pkg=postgres -o=bindata.go queries/...
package postgres

import (
	"bytes"

	"github.com/nleof/goyesql"
)

var queries = goyesql.MustParseBytes(GetQueries())

// GetQueries gets the graphql schema
func GetQueries() []byte {
	buf := bytes.Buffer{}
	for _, name := range AssetNames() {
		b := MustAsset(name)
		buf.Write(b)

		// Add a newline if the file does not end in a newline.
		if len(b) > 0 && b[len(b)-1] != '\n' {
			buf.WriteByte('\n')
		}
	}

	return buf.Bytes()
}
