// Package graphql handles the details of GraphQL
//go:generate go-bindata -ignore=\.go -pkg=graphql -o=bindata.go ./...
package graphql

import (
	"bytes"
)

// GetRootSchema gets the graphql schema
func GetRootSchema() string {
	buf := bytes.Buffer{}
	for _, name := range AssetNames() {
		b := MustAsset(name)
		buf.Write(b)

		// Add a newline if the file does not end in a newline.
		if len(b) > 0 && b[len(b)-1] != '\n' {
			buf.WriteByte('\n')
		}
	}

	return buf.String()
}
